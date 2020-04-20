//biblioteca DHT11
#include <dht.h>
//biblioteca Shield
#include <SPI.h>
#include <Ethernet.h>
//Biblioteca Websocket
#include <ArduinoHttpClient.h>
//Biblioteca Estação
#include "WeatherSensor.h"
#define RF_IN  2

//====DHT Sensor=====
int    temperatura = 0x00, umidade     = 0x00;
dht my_dht;
//===================
byte i;
byte *packet;
String guId = "3fb944";

// Definição dos Leds;
#define dhtsensor 11
#define dht_pin 12

// Instanciamento do serviço de rede com atribuição de um nome
// para o servidor(server) e da porta(80) utilizada;
char serverAddress[] = "meteorologia.adsvilhena.ninja/api";  // Endereço do servidor socket
int port = 80;
byte mac[] = {0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x02};
byte ip[] = { 192, 168, 0, 15 };

EthernetClient cliente;
WebSocketClient client = WebSocketClient(cliente, serverAddress, port);
int count = 0;

//========================================BOOT ESTAÇÃO=======================================================================================

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
  pinMode(dhtsensor, OUTPUT);
  sei(); //<-------enable interrupts--------
  Serial.print("IP Address: ");
  Serial.println(Ethernet.localIP());

} //  END-SETUP

void loop() {
      client.begin();
      delay(500);
      while (client.connected()) {
        if (weather._interval)
        {
          weather.Receiver(weather.interval);
          if (weather.acquired())
          {
            
            String dadosws = guId + "|" + weather.get_temperature() + "|" + weather.get_humidity() + "|" + 
            weather.get_rainfall() + "|" + weather.get_wind_gust_kmh() + "|" + weather.get_wind_direction_str();
            
            delay(500);
            
            //Montagem e envio da string com dados
            client.beginMessage(TYPE_TEXT);
            client.print(dadosws);
            client.endMessage();
            Serial.println("Mensagem enviada !");
            //Auto incremento do contador para próxima mensagem
            count++;
            //verificação se alguma mensagem está disponível para ser recebida
            int messageSize = client.parseMessage();
            if (messageSize > 0) {
              Serial.println("Retorno recebido");
              Serial.println(client.readString());
            }
            // Delay de 5 segundos
            delay(5000);
          }
          weather._interval = 0;
        }
    }
}
