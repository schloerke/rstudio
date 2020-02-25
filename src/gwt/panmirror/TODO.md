


## TODO

Table widths not working

Using brackets creates math!

DeleteRows DeleteCols gestures for table
Insert Multiple Rows for table?

## Exceptions



User-Agent: Mozilla/5.0 (Macintosh  Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36
24 Feb 2020 17:59:37 [rserver] ERROR CLIENT EXCEPTION (rsession-jjallaire): 13 exceptions caught: (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function  (TypeError) : asNativeString__Ljava_lang_String$NativeString___devirtual$_0_g$(...).indexOf is not a function;
Unknown@-1#-1::google.gwt.event.shared.UmbrellaException: 13 exceptions caught:
rstudio-0.js@10#639::Throwable.createError
rstudio-0.js@48#703::Throwable.initializeBackingError
rstudio-0.js@8#546::Throwable.Throwable
rstudio-0.js@18#815::Exception.Exception
rstudio-0.js@18#869::RuntimeException.RuntimeException
rstudio-0.js@25#34710::UmbrellaException.UmbrellaException
rstudio-0.js@26#34781::UmbrellaException
rstudio-0.js@23#34273::HandlerManager.fireEvent
rstudio-0.js@19#59068::fire
rstudio-0.js@10#58986::fireNativePreviewEvent
rstudio-0.js@14#58579::previewEvent
rstudio-0.js@21#60307::dispatchCapturedMouseEvent
rstudio-0.js@28#16335::apply
rstudio-0.js@16#16394::entry0
rstudio-0.js@14#16373::anonymous
Client-ID: 3d803b4c-6043-4112-9aa2-0d6b8362b18b


## Enhancements


Images should support width/align for gfm (write raw_html)

Dialog/picker for images

Sizing/alignment inline for images

Surface attributes

Better direct manipulation for tables

Unit testing for core panmirror code

Improved treatment for relative image paths that don't resolve

FindUX in standalone
Magic comments in standalone
Dynamic commands/format for standalone front-end

Cursor location for insert yaml in the middle of paragraph

Provide some extra vertical space at the bottom when typing at the bottom

- Observed a situation where a pandoc markdown doc with a footnote was converted (via magic comment) to a gfm
document. Then, deleting the footnote caused the entire doc to be deleted with no ability to undo!
- Observed a situation with a table above another table, where attemptign to select and delete the second table (as part of a selection encompassing content before and after the table) resulted in nearly the entire document being removed.
- Backspace key seems to be the culprit for both of the above


Mark input rules should screen whether the mark is valid. Or do they even need to?
(i.e. the mark will be prevented)

improve scrolling with: https://github.com/cferdinandi/smooth-scroll

multimarkdown support is incomplete:
   -mmd_title_block
   -mmd_link_attributes (not written, likely limitation of pandoc)
   -mmd_header_identifiers (work fine, but we currently allow edit of classes + keyvalue for markdown_mmd) 

no support for +pandoc_title_block

cmd+click for links (or gdocs style popup)

We currently can't round-trip reference links (as pandoc doesn't seem to write them, this is
not disimillar from the situation w/ inline footnotes so may be fine)

Improve EditorPane.showPandocWarnings treatment (including localization)

No editing support for fancy list auto-numbering (#. as list item that is auto-numbered)

EditorUI.translate call for translatable text

handling for div with only an id (shading treatment a bit much?)

internal links / external links via cmd+click

Direct parsing of citations (get rid of special post-processing + supported nested)
 (note: for nested we need excludes: '')

MathQuill/MathJax: 
   https://pboysen.github.io/
   https://discuss.prosemirror.net/t/odd-behavior-with-nodeview-and-atom-node/1521

critic markup: http://criticmarkup.com/

pandoc scholar: https://pandoc-scholar.github.io/
pandoc jats:    https://github.com/mfenner/pandoc-jats

pandoc schema: https://github.com/jgm/pandoc-types/blob/master/Text/Pandoc/Definition.hs#L94

## Project/Build

Can we minify the typescript library?

https://fuse-box.org/docs/getting-started/typescript-project

Can we combine the editor library w/ the prosemirror/orderedmap dependencies?
https://github.com/fathyb/parcel-plugin-typescript


https://stackoverflow.com/questions/44893654/how-do-i-get-typescript-to-bundle-a-3rd-party-lib-from-node-modules

https://www.typescriptlang.org/docs/handbook/gulp.html
https://www.npmjs.com/package/@lernetz/gulp-typescript-bundle

https://webpack.js.org/guides/typescript/

https://github.com/gulp-community/gulp-concat


may need to make use of project references (allows mutliple tsconfig.json files
that all reference eachother)
   https://www.typescriptlang.org/docs/handbook/project-references.html
will ultimately need something like lerna:
   https://blog.logrocket.com/setting-up-a-monorepo-with-lerna-for-a-typescript-project-b6a81fe8e4f8/

create-react-app currently doesn't support project references:
   https://github.com/facebook/create-react-app/issues/6799

simple explanation:
   https://stackoverflow.com/questions/51631786/how-to-use-project-references-in-typescript-3-0
   https://gitlab.com/parzh/re-scaled/commit/ca47c1f6195b211ed5d61d2821864c8cecd86bad
   https://www.typescriptlang.org/docs/handbook/project-references.html#structuring-for-relative-modules