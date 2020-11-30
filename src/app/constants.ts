export const BASE = '';
export const HOME = 'home';
export const EDITOR = 'editor';
export const TEXTAREA = 'with-textarea';


export const MEDIUMCONFIG = {
    toolbar: {
        /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: [
            "bold",
            "italic",
            "strikethrough",
            "subscript",
            "superscript",
            "anchor",
            "image",
            "quote",
            "pre",
            "orderedlist",
            "unorderedlist",
            "indent",
            "outdent",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "removeFormat",
            "html"
        ],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: "medium-editor-button-first",
        lastButtonClass: "medium-editor-button-last",
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: "center",
        sticky: false,
        updateOnEmptySelection: false
    }
}
