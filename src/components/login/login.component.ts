import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  isCofirmOTP: boolean = true;
  otpInputs: string[] = ['', '', '', '', '', ''];
  isCodeEntered = false;

  constructor(private renderer: Renderer2) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      const firstInput = document.querySelector('input[type="number"]');
      console.log(firstInput);

      if (firstInput) {
        this.renderer.selectRootElement(firstInput).focus();
      }
    });
  }
  onPaste(event: ClipboardEvent, startIndex: number) {
    event.preventDefault();
    const pastedValue = event.clipboardData?.getData('text') || '';

    for (let i = 0; i < this.otpInputs.length; i++) {
      if (startIndex + i < this.otpInputs.length) {
        this.otpInputs[startIndex + i] = pastedValue[i] || '';
      }
    }

    this.updateCodeEntered();
  }

  onKeyUp(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 1) {
      input.value = ''; // Clear input if more than one character is entered
      return;
    }

    if (event.key === 'Backspace' && index > 0) {
      // Disable current input and focus on previous input on Backspace
      this.otpInputs[index] = '';
      this.updateCodeEntered();
    } else if (event.key >= '0' && event.key <= '9') {
      // Move focus to the next input on valid number input
      const nextIndex = index + 1;
      if (nextIndex < this.otpInputs.length) {
        const nextInput = document.querySelector(
          `input[type="number"]:nth-child(${nextIndex + 1})`
        );
        if (nextInput) {
          console.log(nextInput);
          this.renderer.selectRootElement(nextInput).focus();

          // nextInput.focus();
        }
      }
      this.updateCodeEntered();
    }
  }

  updateCodeEntered() {
    // Kiểm tra xem mã OTP đã được nhập đầy đủ hay chưa
    this.isCodeEntered = this.otpInputs.every((input) => input !== '');
  }

  verifyCode() {
    // Xử lý logic xác nhận mã OTP
    console.log('Verifying code:', this.otpInputs.join(''));
  }

  requestCodeAgain() {
    // Xử lý logic yêu cầu gửi lại mã OTP
    console.log('Requesting code again');
  }

  onSubmit() {
    const isFormValid = this.userForm.valid;
    this.isFormSubmitted = true;
    this.isCofirmOTP = true;
  }
}
