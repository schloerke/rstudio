/*
 * completion-popup.tsx
 *
 * Copyright (C) 2020 by RStudio, PBC
 *
 * Unless you have received this program directly from RStudio pursuant
 * to the terms of a commercial license agreement with RStudio, then
 * this program is licensed to you under the terms of version 3 of the
 * GNU Affero General Public License. This program is distributed WITHOUT
 * ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT,
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the
 * AGPL (http://www.gnu.org/licenses/agpl-3.0.txt) for more details.
 *
 */

import { EditorView } from 'prosemirror-view';

import React from 'react';
import ReactDOM from 'react-dom';

import { WidgetProps } from "../../api/widgets/react";
import { Popup } from '../../api/widgets/popup';

import { CompletionHandler, CompletionResult } from '../../api/completion';
import { applyStyles } from '../../api/css';

import './completion-popup.css';

export function createCompletionPopup() : HTMLElement {
  const popup = window.document.createElement('div');
  popup.tabIndex = 0;
  popup.style.position = 'absolute';
  popup.style.zIndex = '1000';
  return popup;
}

export function renderCompletionPopup(
  view: EditorView, 
  handler: CompletionHandler, 
  result: CompletionResult,
  popup: HTMLElement
) : Promise<boolean> {

  // helper function to show the popup at the specified position
  const renderPopup = (completions: any[]) => {
    // create props
    const props = { handler, completions };

    // size popup
    const size = completionPopupSize(props);
    const positionStyles = panelPositionStylesForPosition(view, result.pos, size.width, size.height);
    applyStyles(popup, [], positionStyles);
    
    // render popup
    ReactDOM.render(<CompletionPopup {...props} />, popup);
  };
  
  // show completions (resolve promise if necessary)
  if (result.completions instanceof Promise) {
    return result.completions.then(completions => {
      renderPopup(completions);
      return completions.length > 0;
    });
  } else {
    renderPopup(result.completions);
    return Promise.resolve(result.completions.length > 0);
  }
}

export function destroyCompletionPopup(popup: HTMLElement) {
  ReactDOM.unmountComponentAtNode(popup);
  popup.remove();
}

interface CompletionWidgetProps extends WidgetProps {
  handler: CompletionHandler;
  completions: any[];
}

const CompletionPopup: React.FC<CompletionWidgetProps> = props => {
  return (
    <Popup 
      style={props.style}
      classes={['pm-completion-popup'].concat(props.classes || [])}
    >
      <CompletionList {...props}/> 
    </Popup>
  );
};

const kDefaultItemHeight = 20;
const kDefaultMaxVisible = 10;
const kDefaultWidth = 180;

const CompletionList: React.FC<CompletionWidgetProps> = props => {

  const { component, itemHeight = kDefaultItemHeight } = props.handler.view;

  const size = completionPopupSize(props);

  return (
    <div className={'pm-completion-list'} style={{ width: size.width + 'px', height: size.height + 'px'}}>
      {props.completions.map(completion => {
        // need to provide key for both wrapper and item
        // https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js#answer-28329550
        const key = props.handler.view.key(completion);
        const item = React.createElement(component, { ...completion, key });
        return (
          <div className={'pm-completion-item'} style = {{ height: itemHeight }} key={key}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

function completionPopupSize(props: CompletionWidgetProps) {

  // some extra padding to tweak whitespace around list/items 
  const kVerticalListPadding = 6;

  // get view props (apply defaults)
  const { 
    itemHeight = kDefaultItemHeight, 
    maxVisible = kDefaultMaxVisible, 
    width = kDefaultWidth 
  } = props.handler.view;

  return {
    width,
    height: (itemHeight * Math.min(maxVisible, props.completions.length)) +
            kVerticalListPadding
  };
}


const kVerticalPadding = 8;
const kMinimumPanelPaddingToEdgeOfView = 5;
function panelPositionStylesForPosition(view: EditorView, pos: number, height: number, width: number) {
  const editorRect = view.dom.getBoundingClientRect();

  const selectionCoords = view.coordsAtPos(pos);

  const maximumTopPosition = Math.min(
    selectionCoords.bottom + kVerticalPadding,
    window.innerHeight - height - kMinimumPanelPaddingToEdgeOfView,
  );
  const minimumTopPosition = editorRect.y;
  const popupTopPosition = Math.max(minimumTopPosition, maximumTopPosition);

  const maximumLeftPosition = Math.min(
    selectionCoords.right,
    window.innerWidth - width - kMinimumPanelPaddingToEdgeOfView,
  );
  const minimumLeftPosition = editorRect.x;
  const popupLeftPosition = Math.max(minimumLeftPosition, maximumLeftPosition);

  // styles we'll return
  const styles = {
    top: popupTopPosition + 'px',
    left: popupLeftPosition + 'px',
  };

  return styles;
}