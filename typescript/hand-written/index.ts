import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner } from '@syncfusion/ej2-pdfviewer';
// tslint:disable-next-line:max-line-length
import { Switch } from '@syncfusion/ej2-buttons';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner);


    
    let viewer: PdfViewer = new PdfViewer();
     viewer.documentPath = "https://cdn.syncfusion.com/content/pdf/handwritten-signature.pdf";

    var switchObj = new Switch({ value: 'Standalone Rendering', checked: true });
    switchObj.appendTo('#checked');
    
    switchObj.change = function (args) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://ej2services.syncfusion.com/js/development/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
    
    viewer.appendTo('#pdfViewer');
    // tslint:disable-next-line
    viewer.documentLoad = function(): any {
    viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
    };
