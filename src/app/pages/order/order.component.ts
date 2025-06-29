import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="hero-section">
      <div class="container mx-auto px-4 py-16 text-center">
        <h1 class="text-4xl font-bold mb-4">{{ 'ORDER.TITLE' | translate }}</h1>
        <p class="text-xl text-gray-100 max-w-3xl mx-auto">
          {{ 'ORDER.SUBTITLE' | translate }}
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Stepper -->
      <div class="mb-12">
        <div class="flex flex-wrap justify-center">
          <div class="step-item" [class.active]="currentStep === 1" [class.completed]="currentStep > 1">
            <div class="step-counter">1</div>
            <div class="step-name">{{ 'ORDER.STEP1_LABEL' | translate }}</div>
          </div>
          <div class="step-item" [class.active]="currentStep === 2" [class.completed]="currentStep > 2">
            <div class="step-counter">2</div>
            <div class="step-name">{{ 'ORDER.STEP2_LABEL' | translate }}</div>
          </div>
          <div class="step-item" [class.active]="currentStep === 3" [class.completed]="currentStep > 3">
            <div class="step-counter">3</div>
            <div class="step-name">{{ 'ORDER.STEP3_LABEL' | translate }}</div>
          </div>
          <div class="step-item" [class.active]="currentStep === 4">
            <div class="step-counter">4</div>
            <div class="step-name">{{ 'ORDER.STEP4_LABEL' | translate }}</div>
          </div>
        </div>
      </div>

      <!-- Step 1: Choose Dishes -->
      @if (currentStep === 1) {
        <div>
          <h2 class="text-2xl font-bold mb-6">{{ 'ORDER.STEP1_TITLE' | translate }}</h2>

          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Menu Categories and Items -->
            <div class="lg:w-2/3">
              <div class="categories-nav mb-6">
                <!-- Categories navigation here... -->
              </div>

              <div class="menu-items grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Menu items here... -->
                @for (dish of currentCategoryDishes; track dish.id) {
                  <div class="menu-item">
                    <img [src]="dish.image" [alt]="dish.name" class="w-full h-48 object-cover rounded-t-lg" loading="lazy">
                    <div class="p-4 border border-t-0 rounded-b-lg">
                      <h3 class="text-xl font-semibold mb-2">{{dish.name}}</h3>
                      <p class="text-gray-600 mb-4 h-16 overflow-hidden">{{dish.description}}</p>
                      <div class="flex justify-between items-center">
                        <span class="text-xl font-bold">€{{dish.price.toFixed(2)}}</span>
                        <div class="flex items-center">
                          @if (getCartItemQuantity(dish) > 0) {
                            <button
                              (click)="removeFromCart(dish)"
                              class="bg-gray-200 text-gray-700 w-8 h-8 rounded-full">-</button>
                          }
                          @if (getCartItemQuantity(dish) > 0) {
                            <span class="mx-2">{{getCartItemQuantity(dish)}}</span>
                          }
                          <button
                            (click)="addToCart(dish)"
                            class="bg-primary-500 text-white w-8 h-8 rounded-full">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Order Summary -->
            <div class="lg:w-1/3">
              <div class="bg-gray-50 p-6 rounded-lg sticky top-4">
                <h3 class="text-xl font-bold mb-4">{{ 'ORDER.YOUR_ORDER' | translate }}</h3>

                @if (cart.length === 0) {
                  <div class="text-gray-500 mb-4">
                    {{ 'ORDER.EMPTY_CART' | translate }}
                  </div>
                }

                @if (cart.length > 0) {
                  <div>
                    @for (item of cart; track item.dish.id) {
                      <div class="flex justify-between py-2 border-b">
                        <div>
                          <span class="font-medium">{{item.quantity}}x</span> {{item.dish.name}}
                        </div>
                        <div>€{{(item.dish.price * item.quantity).toFixed(2)}}</div>
                      </div>
                    }

                    <div class="mt-4 space-y-2">
                      <div class="flex justify-between">
                        <span>{{ 'ORDER.SUBTOTAL' | translate }}:</span>
                        <span>€{{subtotal.toFixed(2)}}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>{{ 'ORDER.DELIVERY_FEE' | translate }}:</span>
                        <span>€{{deliveryMethod === 'delivery' ? deliveryFee.toFixed(2) : '0.00'}}</span>
                      </div>
                      <div class="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>{{ 'ORDER.TOTAL' | translate }}:</span>
                        <span>€{{subtotal + (deliveryMethod === 'delivery' ? deliveryFee : 0).toFixed(2)}}</span>
                      </div>
                    </div>
                  </div>
                }

                <div class="mt-6">
                  <h4 class="font-medium mb-2">{{ 'ORDER.DELIVERY_OPTIONS' | translate }}:</h4>
                  <div class="space-y-2">
                    <label class="flex items-center space-x-2">
                      <input type="radio" value="pickup" [(ngModel)]="deliveryMethod" name="deliveryMethod" class="text-primary-500">
                      <span>{{ 'ORDER.PICKUP' | translate }}</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="radio" value="delivery" [(ngModel)]="deliveryMethod" name="deliveryMethod" class="text-primary-500">
                      <span>{{ 'ORDER.DELIVERY' | translate }} (+ €{{deliveryFee.toFixed(2)}})</span>
                    </label>
                  </div>
                </div>

                <button
                  [disabled]="cart.length === 0"
                  (click)="goToStep(2)"
                  class="w-full mt-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ 'ORDER.CONTINUE' | translate }}
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Step 2-4: Further steps... -->
    </div>
  `,
  styles: `
  .hero-section {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                url('/assets/images/order-hero.jpg') no-repeat center center;
    background-size: cover;
    color: white;
  }

  .step-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  .step-item:not(:first-child):before {
    content: "";
    position: absolute;
    top: 15px;
    left: -50%;
    height: 2px;
    width: 100%;
    background-color: #e2e8f0;
  }

  .step-item.active .step-counter,
  .step-item.completed .step-counter {
    background-color: #ed8936;
    color: white;
  }

  .step-item.completed:before {
    background-color: #ed8936;
  }

  .step-counter {
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e2e8f0;
    border-radius: 50%;
    margin-bottom: 6px;
    font-weight: 600;
  }

  .step-name {
    font-size: 0.9rem;
    color: #718096;
  }

  .step-item.active .step-name,
  .step-item.completed .step-name {
    color: #2d3748;
    font-weight: 600;
  }
  `
})
export class OrderComponent implements OnInit {
  currentStep = 1;
  cart: any[] = [];
  currentCategoryDishes: any[] = [];
  deliveryMethod = 'pickup';
  deliveryFee = 5.00;
  subtotal = 0;
  orderNumber = '';

  categories = ['tavola calda', 'primi', 'dolci', 'bevande'];
  categoryNames = {
    tavolaCalda: 'Tavola Calda',
    primi: 'Primi Piatti',
    dolci: 'Dolci',
    bevande: 'Bevande',
  };

  menuItems: MenuItem[] = [
    // Tavola calda
    {
      id: 1,
      name: 'Arancini',
      description: 'Palline di riso ripiene di ragù, piselli e formaggio.',
      price: 7.5,
      image: '/assets/images/arancini.jpg',
      category: 'tavola calda',
    },
    {
      id: 2,
      name: 'Pizza in teglia',
      description: 'Pizza in teglia con pomodoro, mozzarella e basilico.',
      price: 6.0,
          image: '/src/assets/images/pizzateglia.jpg',
      category: 'tavola calda',
    },
    {
      id: 3,
      name: 'Pizza a portafoglio',
      description: 'Pizza a portafoglio con pomodoro, mozzarella e basilico.',
      price: 12.5,
      image: '/assets/images/pizzaportafoglio.jpg',
      category: 'tavola calda',
    },
    {
      id: 4,
      name: 'Pizza fritta',
      description: 'Pizza fritta con pomodoro, mozzarella e basilico.',
      price: 11.0,
      image: '/assets/images/siciliana.jpg',
      category: 'tavola calda',
    },
    {
      id: 5,
      name: 'Focacce',
      description: 'Focacce con pomodoro, mozzarella e basilico.',
      price: 10.5,
      image: '/assets/images/focaccia.jpg',
      category: 'tavola calda',
    },
    // Primi
    {
      id: 6,
      name: 'Lasagne alla Bolognese',
      description: 'Lasagne alla Bolognese con ragù e besciamella.',
      price: 10.5,
      image: '/assets/images/lasagnebolo.jpg',
      category: 'primi',
    },
    // Dolci
    {
      id: 7,
      name: 'Cannoli Siciliani',
      description: 'Croccanti cilindri con ripieno di ricotta dolce.',
      price: 5.5,
      image: '/assets/images/cannoli1.jpg',
      category: 'dolci',
    },
    {
      id: 8,
      name: 'Tiramisù',
      description: 'Il classico dolce italiano con caffè e mascarpone.',
      price: 6.0,
      image: '/assets/images/tiramisu.jpg',
      category: 'dolci',
    },
    // Bevande
    {
      id: 9,
      name: 'Caffè',
      description: 'Caffè',
      price: 2.0,
      image: '/assets/images/caffè.jpg ',
      category: 'bevande',
    },
  ];

  availableTimes: string[] = [
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
  ];

  deliveryForm: FormGroup;
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,12}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      city: [''],
      postalCode: [''],
      time: ['', Validators.required],
      notes: [''],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['cash', Validators.required],
      cardName: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: [''],
    });
  }

  ngOnInit(): void {
    // Imposta validatori condizionali per l'indirizzo se è selezionata la consegna
    this.updateValidators();
  }

  updateValidators(): void {
    const addressControl = this.deliveryForm.get('address');
    const cityControl = this.deliveryForm.get('city');
    const postalCodeControl = this.deliveryForm.get('postalCode');

    if (this.deliveryMethod === 'delivery') {
      addressControl?.setValidators([Validators.required]);
      cityControl?.setValidators([Validators.required]);
      postalCodeControl?.setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]{5}$/),
      ]);
    } else {
      addressControl?.clearValidators();
      cityControl?.clearValidators();
      postalCodeControl?.clearValidators();
    }

    addressControl?.updateValueAndValidity();
    cityControl?.updateValueAndValidity();
    postalCodeControl?.updateValueAndValidity();

    // Imposta validatori per i campi della carta se è selezionato il pagamento con carta
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
      const cardNameControl = this.paymentForm.get('cardName');
      const cardNumberControl = this.paymentForm.get('cardNumber');
      const expiryControl = this.paymentForm.get('expiry');
      const cvvControl = this.paymentForm.get('cvv');

      if (method === 'card') {
        cardNameControl?.setValidators([Validators.required]);
        cardNumberControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{16}$/),
        ]);
        expiryControl?.setValidators([
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/),
        ]);
        cvvControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{3,4}$/),
        ]);
      } else {
        cardNameControl?.clearValidators();
        cardNumberControl?.clearValidators();
        expiryControl?.clearValidators();
        cvvControl?.clearValidators();
      }

      cardNameControl?.updateValueAndValidity();
      cardNumberControl?.updateValueAndValidity();
      expiryControl?.updateValueAndValidity();
      cvvControl?.updateValueAndValidity();
    });
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter((item) => item.category === category);
  }

  isInCart(id: number): boolean {
    return this.cart.some((item) => item.dish.id === id);
  }

  getCartItemQuantity(dish: any): number {
    const item = this.cart.find(i => i.dish.id === dish.id);
    return item ? item.quantity : 0;
  }

  addToCart(dish: any): void {
    const existingItem = this.cart.find(i => i.dish.id === dish.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ dish, quantity: 1 });
    }
    this.updateSubtotal();
  }

  removeFromCart(dish: any): void {
    const existingItem = this.cart.find(i => i.dish.id === dish.id);
    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity === 0) {
        this.cart = this.cart.filter(i => i.dish.id !== dish.id);
      }
    }
    this.updateSubtotal();
  }

  updateSubtotal(): void {
    this.subtotal = this.cart.reduce((sum, item) => sum + (item.dish.price * item.quantity), 0);
  }

  calculateTotal(): number {
    let total = this.subtotal;
    if (this.deliveryMethod === 'delivery') {
      total += this.deliveryFee;
    }
    return total;
  }

  setDeliveryOption(option: string): void {
    this.deliveryMethod = option;
    this.updateValidators();
  }

  nextStep(): void {
    if (this.currentStep === 3) {
      // Genera un numero d'ordine casuale
      this.orderNumber =
        'TR' + Math.floor(10000 + Math.random() * 90000).toString();
    }

    this.currentStep += 1;
  }

  prevStep(): void {
    this.currentStep -= 1;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.deliveryForm.get(fieldName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  isPaymentFieldInvalid(fieldName: string): boolean {
    const control = this.paymentForm.get(fieldName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  isDeliveryFormValid(): boolean {
    if (this.deliveryMethod === 'pickup') {
      // Per il ritiro, controlla solo i campi base
      return this.deliveryForm.get('name')?.valid &&
        this.deliveryForm.get('phone')?.valid &&
        this.deliveryForm.get('email')?.valid &&
        this.deliveryForm.get('time')?.valid
        ? true
        : false;
    } else {
      // Per la consegna, controlla anche i campi dell'indirizzo
      return this.deliveryForm.valid;
    }
  }

  isPaymentFormValid(): boolean {
    const method = this.paymentForm.get('paymentMethod')?.value;

    if (method === 'cash') {
      return true;
    } else {
      return this.paymentForm.valid;
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }
}
