<template>
    <div>
        <div class="control-section">
            <div class="flex-container">
                <label class="switchLabel" for="checked">Standalone PDF Viewer</label>
                <div class="e-message render-mode-info">
                    <span class="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
                </div>
                <div>
                    <ejs-switch cssClass="buttonSwitch" id="checked" :change="change" :checked="true"></ejs-switch>
                </div>
            </div>
            
            <ejs-pdfviewer 
                id="pdfviewer" 
                ref="pdfviewer" 
                :documentPath="documentPath" 
                :enableFormFieldsValidation="true"
                :showNotificationDialog="false" 
                :validateFormFields="validateFormFields">
            </ejs-pdfviewer>
        </div>

    </div>
</template>
<style scoped>
#pdfviewer {
    height: 640px;
}

.flex-container {
    display: flex;
    justify-content: flex-end;
}

.render-mode-info {
    background: none;
    border: none;
    padding-left: 0px;
}

.render-mode-info .render-mode-info-icon {
    height: 16px;
    width: 16px;
}

.switchLabel {
    font-family: "Segoe UI", "GeezaPro", "DejaVu Serif", sans-serif;        
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.24px;
    text-align: right;
    font-size: 14px;
}

.render-mode-info .render-mode-info-icon::before {
    line-height: 0.5rem;
}

.buttonSwitch {
    Width: 40px;
    Height: 24px;
}

</style>
<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner } from "@syncfusion/ej2-vue-pdfviewer";
import { SwitchComponent } from "@syncfusion/ej2-vue-buttons";

var viewer;
export default {
    components: {
        'ejs-pdfviewer': PdfViewerComponent,
        'ejs-switch': SwitchComponent
    },
    data: function () {
        return {
            documentPath: 'https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf'
        }
    },
    provide: {
        PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner]
    },
    methods: {
        validateFormFields: function (args) {
            var errorMessage = "Required Field(s): ";
            viewer = this.$refs.pdfviewer.ej2Instances;
            var forms = viewer.formFieldCollections;
            var flag = false;
            var radioGroupName = "";
            for (var i = 0; i < forms.length; i++) {
                var text = "";
                if (forms[i].isRequired == true) {
                    if (forms[i].type.toString() == "Checkbox" && forms[i].isChecked == false) {
                        text = forms[i].name;
                    }
                    else if (forms[i].type == "RadioButton" && flag == false) {
                        radioGroupName = forms[i].name;
                        if (forms[i].isSelected == true)
                            flag = true;
                    }
                    else if (forms[i].type.toString() != "Checkbox" && forms[i].type != "RadioButton" && forms[i].value == "") {
                        text = forms[i].name;
                    }
                    if (text != "") {
                        if (errorMessage == "Required Field(s): ") {
                            errorMessage += text;
                        }
                        else {
                            errorMessage += ", " + text;
                        }
                    }
                }
            }
            if (!flag && radioGroupName != "") {
                if (errorMessage == "Required Field(s): ")
                    errorMessage += radioGroupName;
                else
                    errorMessage += ", " + radioGroupName;
            }
            if (errorMessage != "Required Field(s): ") {
                viewer.showNotificationPopup(errorMessage);
            }
        },
        change: function (args) {
            var viewer = this.$refs.pdfviewer.ej2Instances;
            if (args.checked) {
                viewer.serviceUrl = "";
            } else {
                viewer.serviceUrl = "https://ej2services.syncfusion.com/vue/development/api/pdfviewer";
            }           
            viewer.dataBind();
            viewer.load(viewer.documentPath, null);
        }
    }
};

</script>