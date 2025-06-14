import { Component } from '@angular/core';

@Component({
  selector: 'privacy-policy',
  standalone: true,
  template: `
    <h1>Privacy Policy</h1>
    <p>
      La presente informativa descrive come raccogliamo, utilizziamo e
      proteggiamo i dati personali dei nostri utenti, in conformità con il
      Regolamento Generale sulla Protezione dei Dati (GDPR).
    </p>

    <h2>1. Titolare del trattamento</h2>
    <p>
      Il titolare del trattamento dei dati è [TRISKELE-GASTRONOMIE], con sede
      legale in [3 Rue des Francs Bourgeois, 35000 Rennes], contattabile
      all’indirizzo email [triskelegastronomie&#64;gmail.com].
    </p>

    <h2>2. Tipi di dati raccolti</h2>
    <p>
      Raccogliamo dati personali forniti direttamente dagli utenti, quali nome,
      indirizzo email e altre informazioni necessarie per rispondere alle
      richieste o fornire servizi.
    </p>

    <h2>3. Finalità del trattamento</h2>
    <p>
      I dati sono utilizzati esclusivamente per rispondere alle richieste degli
      utenti, inviare comunicazioni inerenti ai servizi offerti e per adempiere
      agli obblighi di legge.
    </p>

    <h2>4. Modalità di trattamento</h2>
    <p>
      Il trattamento dei dati avviene con strumenti informatici e manuali,
      adottando misure di sicurezza idonee a proteggerli da accessi non
      autorizzati, perdita o divulgazione indebita.
    </p>

    <h2>5. Conservazione dei dati</h2>
    <p>
      I dati personali sono conservati per il tempo necessario a conseguire le
      finalità per cui sono stati raccolti e in conformità con le normative
      vigenti.
    </p>

    <h2>6. Diritti degli interessati</h2>
    <p>
      Gli utenti possono esercitare i diritti previsti dagli articoli 15-22 del
      GDPR, tra cui accesso, rettifica, cancellazione, limitazione del
      trattamento, opposizione e portabilità dei dati, inviando una richiesta al
      titolare del trattamento.
    </p>

    <h2>7. Modifiche alla privacy policy</h2>
    <p>
      Ci riserviamo il diritto di aggiornare questa informativa. Eventuali
      modifiche saranno pubblicate su questa pagina.
    </p>

    <p>
      Per qualsiasi domanda o richiesta relativa alla privacy, contattaci
      all’indirizzo [triskelegastronomie&#64;gmail.com].
    </p>
  `,
})
export class PrivacyPolicyComponent {}
