import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  // 1. Importe ReactiveFormsModule para o formulário
  imports: [IonicModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class ContactPage implements OnInit {

  // 2. Crie a variável para o formulário
  contactForm: FormGroup;

  // 3. Injete o FormBuilder e o ToastController
  constructor(
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    // 4. Inicialize o formulário com validações
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
  }

  // 5. Crie a função de envio
  async onSubmit() {
    if (this.contactForm.valid) {
      // Simula o envio dos dados
      console.log('Formulário Enviado:', this.contactForm.value);

      // Mostra uma mensagem de sucesso
      const toast = await this.toastController.create({
        message: 'Mensagem enviada com sucesso!',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      
      this.contactForm.reset(); // Limpa o formulário
    } else {
      // Mostra uma mensagem de erro se o formulário for inválido
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos corretamente.',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  }

  // Funções helper para facilitar a verificação no template
  isInvalid(controlName: string) {
    const control = this.contactForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}