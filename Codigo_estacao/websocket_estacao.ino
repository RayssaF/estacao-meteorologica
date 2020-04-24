#include <Ethernet.h>
#include <ArduinoHttpClient.h>
//Biblioteca Estação
#include "WeatherSensor.h"
#define RF_IN  2

byte i;
byte *packet;
String guId = "3fb944";
int messageSize = 0;

// Definição dos Leds;
#define ledon 11
#define ledstats 12

// Instanciamento do serviço de rede com atribuição de um nome
// para o servidor(server) e da porta(80) utilizada;
char serverAddress[] = "cryptic-cove-06248.herokuapp.com";  // Endereço do servidor socket
int port = 80;
byte mac[] = {0x00, 0x01, 0xBB, 0x12, 0xDE, 0x02};
byte ip[] = { 192, 168, 0, 15 };

EthernetClient cliente;
WebSocketClient client = WebSocketClient(cliente, serverAddress, port);
int count = 0;

WeatherSensor weather;

ISR(TIMER1_COMPA_vect)
{
  static byte count = 0;
  static byte was_hi = 0;
  if (digitalRead(RF_IN) == HIGH)
  {
    count++;
    was_hi = 1;
  }
  else
  {
    if (was_hi)
    {
      was_hi = 0;
      weather.interval = count;
      weather._interval = 1;
      count = 0;
    }
  }
}
//============================================================================================================================================

void setup() {
  Ethernet.begin(mac, ip);
  //=========================CONFIGURAÇÃO DE TIMER E PRESET DA ESTAÇÃO========================================================================
  TCCR1A = 0x00;
  TCCR1B = 0x09;
  TCCR1C = 0x00;
  OCR1A  = 399;
  TIMSK1 = 0x02;
  Serial.begin(115200);
  Serial.println("Iniciado!");
  Serial.println("Aguardando dados da estacao...");
  pinMode(RF_IN, INPUT);
  pinMode(ledon, OUTPUT);
  pinMode(ledstats, OUTPUT);
  sei();
  Serial.print("IP Address: ");
  Serial.println(Ethernet.localIP());
}

void loop() {
      if (client.available()) {
      char c = client.read();
      Serial.print(c);
      }
      client.begin();
      delay(500);
      while (client.connected()) {
        if (weather._interval)
        {
          weather.Receiver(weather.interval);
          if (weather.acquired())
          {
            
            String dadosws = guId + "|" + weather.get_temperature() + "|" + weather.get_humidity() + "|" + 
            weather.get_rainfall() + "|" + weather.get_wind_gust_kmh() + "|" /*+ weather.get_wind_direction_str()*/;
        
            //Montagem e envio da string com dados
            client.beginMessage(TYPE_TEXT);
            client.print(dadosws);
            client.endMessage();
            messageSize = client.parseMessage();
            if (messageSize > 0) {
              Serial.println("Retorno recebido");
              Serial.println(client.readString());
            }
            messageSize = 0;
            // Delay de 5 segundos
            delay(20000);
          }
          weather._interval = 0;
        }
    }
    client.stop();
}
