import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="testimonials-section">
      <div class="container">
        <h2 class="section-title">Cosa Dicono i Nostri Clienti</h2>
        <div class="testimonials-carousel">
          @for (testimonial of testimonials; track testimonial.id) {
            <div class="testimonial-card">
              <div class="testimonial-initial">{{ testimonial.name[0] }}</div>
              <div class="testimonial-stars">
                @for (star of [1,2,3,4,5]; track star) {
                  <i [class]="star <= testimonial.rating ? 'star filled' : 'star'">★</i>
                }
              </div>
              <blockquote class="testimonial-text">
                {{ testimonial.text }}
              </blockquote>
              <div class="testimonial-author">
                <div class="name">{{ testimonial.name }}</div>
                <div class="position">{{ testimonial.position }}, {{ testimonial.company }}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .testimonials-section {
      background-color: #f9f9f9;
      padding: 80px 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section-title {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.2rem;
      color: #333;
      position: relative;
      font-family: 'Playfair Display', serif;
    }

    .section-title:after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background-color: #e6c15a;
      margin: 15px auto 0;
    }

    .testimonials-carousel {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
    }

    .testimonial-card {
      background-color: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: center;
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .testimonial-initial {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #e6c15a;
      color: #222;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: bold;
      margin: 0 auto 20px;
    }

    .testimonial-stars {
      margin-bottom: 20px;
      text-align: center;
    }

    .star {
      color: #ddd;
      font-size: 20px;
    }

    .star.filled {
      color: #e6c15a;
    }

    .testimonial-text {
      font-style: italic;
      color: #555;
      line-height: 1.6;
      margin: 0 0 20px;
      text-align: center;
    }

    .testimonial-author {
      text-align: center;
    }

    .testimonial-author .name {
      font-weight: 700;
      color: #333;
      font-size: 1.1rem;
    }

    .testimonial-author .position {
      color: #666;
      font-size: 0.9rem;
    }

    @media (max-width: 992px) {
      .testimonials-carousel {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .testimonials-carousel {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Marco Rossi',
      position: 'Cliente abituale',
      company: 'Rennes',
      text: 'Le lasagne di Triskele sono le migliori che abbia mai assaggiato fuori dall\'Italia. Un pezzo d\'Italia nel cuore di Rennes!',
      rating: 5
    },
    {
      id: 2,
      name: 'Laura Bianchi',
      position: 'Turista',
      company: 'Milano',
      text: 'Durante la mia visita a Rennes ho scoperto questo gioiello di gastronomia italiana. Gli arancini sono autentici e deliziosi.',
      rating: 5
    },
    {
      id: 3,
      name: 'Jean Dupont',
      position: 'Buongustaio',
      company: 'Rennes',
      text: 'I cannoli siciliani sono straordinari, croccanti fuori e con un ripieno di ricotta perfettamente dolce. Da provare!',
      rating: 4
    }
  ];
}
