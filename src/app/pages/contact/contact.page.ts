import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header.component';
import { CommonModule } from '@angular/common';
import { HighlightCardDirective } from 'src/app/diretivas/highlight-card.directive';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  imports: [IonicModule, CommonModule, HighlightCardDirective],
})
export class ContactPage {}
