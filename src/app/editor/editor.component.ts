import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import MediumEditor from 'medium-editor'
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { MEDIUMCONFIG } from '../constants';

interface FormData {
  userID: string;
  content: string;
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  user: any;
  editor: any;
  title = "Welcome!";
  docs = [];
  doc: string = 'editor';
  docId: string;
  @ViewChild("media") media: ElementRef;
  editting: boolean = false;
  editableContent: string = '';
  mathContent: string = '';
  constructor(
    private firestore: AngularFirestore,
    private readonly auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      const docRef = this.firestore.collection(this.doc, ref => ref.where("userID", "==", this.user.uid));
      docRef.get().subscribe(ss => { });
      docRef.snapshotChanges().forEach((changes) => {
        changes.map((a) => {
          this.docId = a.payload.doc.id;
        });
      });
      const collectionRef = this.firestore.collection(this.doc);
      const collectionInstance = collectionRef.valueChanges();
      collectionInstance.subscribe(ss => {
        this.docs = ss;
        if (this.docs.length) {
          this.mathContent = this.docs[0].content;
          this.editor.elements[0].dataset.placeholder = '';
        }
      }); 
    });
  }

  ngAfterViewInit() {
    const edit = this.media.nativeElement;
    this.editor = new MediumEditor(edit, MEDIUMCONFIG);

    const triggerAutoSave =  async(event, editable) => {
      this.editableContent = editable.innerHTML
      this.editting = true
       await this.autoSave()
    };

    const throttledAutoSave = MediumEditor.util.throttle(triggerAutoSave, 10000); // 10 second
    this.editor.subscribe("editableInput", throttledAutoSave);

  }

  async autoSave() {
    const payload: FormData = {
      userID: this.user.uid,
      content: this.editableContent
    }
    if (this.editting) {
      console.log("Saving Docs pleae wait");
      if (!this.docs.length) {
        await this.firestore.collection(this.doc).add(payload);
      } else {
        await this.firestore.collection(this.doc).doc(this.docId).update({ 'content': payload.content });
      }
      this.editting = false;
    }
  }
}

