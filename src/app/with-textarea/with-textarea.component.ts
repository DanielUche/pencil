import { Component, OnInit } from '@angular/core';
import * as lodash from 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";

interface FormData {
  userID: string;
  content: string;
}
@Component({
  selector: 'app-with-textarea',
  templateUrl: './with-textarea.component.html',
  styleUrls: ['./with-textarea.component.scss']
})
export class WithTextareaComponent implements OnInit {

  title = 'This uses html textarea';
  mathContent = '';
  msg = '';
  doc: string = 'editor-textarea';
  user: any;
  docId: string;
  docs = [];

  constructor(
    private firestore: AngularFirestore,
    private readonly auth: AuthService) { }

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
        }
      });
    });
  }


  doSomething = lodash.debounce(function () {
    this.msg = 'Saving ...'
    this.autoSave().then(() => {
      this.msg = 'Last saved as ' + new Date().toDateString()
    })
  }, 10000);

  async autoSave() {
    const payload: FormData = {
      userID: this.user.uid,
      content: this.mathContent
    }
    if (!this.docs.length) {
      await this.firestore.collection(this.doc).add(payload);
    } else {
      await this.firestore.collection(this.doc).doc(this.docId).update({ 'content': payload.content });
    }
  }
}
