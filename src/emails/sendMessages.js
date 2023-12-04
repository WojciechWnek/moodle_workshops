import { postRequest } from '../service.js';
import { endpoints } from '../endpoints.js';

const sendMessages = async () => {
  const message = `
  <html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Document</title>
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
    <link
      href='https://fonts.googleapis.com/css2?family=Lato&family=Open+Sans:wght@400;700&family=Oxygen:wght@400;700&display=swap'
      rel='stylesheet'
    />
    <style>
      * { font-family: 'Open Sans', Helvetica, sans-serif; font-weight: 400; line-height: 140%;
      box-sizing: border-box; } h1 { font-weight: 700; } b { font-weight: 700; } table {
      border-collapse: collapse; width: 50%; margin: 20px auto; text-align: center; } th, td {
      border: 1px solid #dddddd; padding: 8px; } th { background-color: #f2f2f2; }
    </style>
  </head>
  <body>
    <h1>Witaj Wojciech Wnęk</h1>
    <p>
      Chcieliśmy podzielić się z Tobą bardzo pozytywną wiadomością. Nasz system monitorujący postępy
      studentów wykazał poprawę w Twoich wynikach w przedmiocie
      <b>KursTestowy</b>. To ogromny krok naprzód i zasługuje na uznanie!
    </p>
    <p>
      Twoje zaangażowanie i wysiłek włożone w dostosowanie swojej strategii uczenia się oraz
      efektywne planowanie czasu zaczynają przynosić oczekiwane rezultaty. To dowodzi, że Twoja
      determinacja i wytrwałość są godne podziwu.
    </p>
    <p>
      Nadal pamiętaj, że jesteśmy tu, aby Ci pomóc w każdym kroku Twojej akademickiej podróży. Jeśli
      potrzebujesz wsparcia, korepetycji lub po prostu chcesz podzielić się swoimi sukcesami, Twój
      Promotor i cała społeczność akademicka są dostępni, aby Cię wesprzeć.
    </p>
    <p>
      Twoje osiągnięcia akademickie mają wpływ na Twoją przyszłość, i cieszymy się, że pracujesz nad
      ich poprawą. Niech ta poprawa będzie motywacją do dalszych sukcesów.
    </p>
    <p>
      Pamiętaj, że każdy krok w kierunku poprawy ma ogromne znaczenie, a razem możemy osiągnąć
      jeszcze więcej.
    </p>
    <p>
      Gratulujemy Ci Twojej dotychczasowej pracy i życzymy dalszych sukcesów w przyszłości!
    </p>
    <br />
    <p>Pozdrawiamy<br />Uniwersytet WSB Merito</p>
  </body>
</html>
  `;
  const response = await postRequest(endpoints.core_message_send_instant_messages, {
    messages: [{ touserid: 8, text: message, textformat: 1 }],
  });
  console.log(response);
};

export default sendMessages;
