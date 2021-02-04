import { Component, ViewEncapsulation, OnInit, ViewChild } from "@angular/core";
import {
  PdfViewerComponent,
  LinkAnnotationService,
  BookmarkViewService,
  MagnificationService,
  ThumbnailViewService,
  ToolbarService,
  NavigationService,
  TextSearchService,
  TextSelectionService,
  PrintService,
  AnnotationService,
  FormFieldsService
} from "@syncfusion/ej2-angular-pdfviewer";

/**
 * Default PdfViewer Controller
 */
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:max-line-length
  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
    AnnotationService,
    FormFieldsService
  ]
})
export class AppComponent {
  @ViewChild("pdfviewer")
  public pdfviewerControl: PdfViewerComponent;
  public formFieldValue: number = -1;
  public service: string =
    "https://ej2services.syncfusion.com/production/web-services/api/pdfviewer";
  public document: string = "FormFillingDocument.pdf";
  ngOnInit(): void {
    // ngOnInit function
  }
  public nextField(): void {
    if (this.formFieldValue >= 0) {
      this.formFieldValue++;
    } else {
      this.formFieldValue = 0;
    }
    this.retireveFormfields(true);
    console.log(this.pdfviewerControl.formFieldCollections.length)
    if (
      this.formFieldValue == this.pdfviewerControl.formFieldCollections.length
    ) {
      this.formFieldValue = -1;
    }
  }
  public retireveFormfields(nextField: boolean): void {
    if (this.formFieldValue != -1) {
      
      let currentData: any = this.pdfviewerControl.formFieldCollections[
        this.formFieldValue
      ];
      let currentTarget: any = document.getElementById(currentData.id);
      if (currentTarget) {
        currentTarget.blur();
        currentTarget.focus();
        //    this.formFieldValue++;
      } else if (this.formFieldValue != -1) {
        let pageNumber: number = parseInt(currentData.id.split("_")[1]);
        if (nextField) {
          pageNumber = pageNumber + 1;
        } else {
          pageNumber = pageNumber - 1;
        }
        this.pdfviewerControl.navigationModule.goToPage();
        currentTarget = document.getElementById(currentData.id);
        if (currentTarget) {
          currentTarget.blur();
          currentTarget.focus();
          //    this.formFieldValue++;
        }
      }
    }
  }
  public previousField(): void {
    if (this.formFieldValue >= 0) {
      this.formFieldValue--;
    } else {
      this.formFieldValue = 0;
    }
    this.retireveFormfields(false);
  }
}
