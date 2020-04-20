/*
 *********************************    
 *   _____          __________   *
 *  |  1  |        |    0     |  *
 *  |     |        |          |  *
 *  |     |        |          |  *
 *__|     |________|          |__*
 *  <500us><-1ms- ><  -1.5ms- >  *
 *********************************
*/
#if defined(ARDUINO) && ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

#include "WeatherSensor.h"

static char* direcao_do_vendo_I[] = {"N", "NNE", "NE", "ENE", "L", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO",};
static char* direcao_do_vendo_R[]= {"0", "23", "45", "68", "90", "113", "135", "158", "180", "203", "225", "248", "270", "293", "315", "338",};

//============================================================================================================================
WeatherSensor::WeatherSensor()
{
  /* constructor */
  _acquired = false;
}



//============================================================================================================================
void WeatherSensor::Receiver(byte intervalo)
{
  byte amostra;
  static byte status = 0;
  static byte pacote, bit, historico;

  
  if (intervalo >= 17 && intervalo <= 25) //<-------Define o pulso de 500us = a 1------
  {
     amostra = 1;
  }  
  
  else if (intervalo >= 55 && intervalo <= 70) //<------Define o pulso de 1500us = a 0------
  { 
    amostra = 0;
  }  
        
  else 
  { 
    status = 0;
    return;
  } 

  if(status == 0) 
  {
    historico = 0xFF; 
    status = 1;
  } 
  
  
  if (status == 1) //<------Adquire valores------
  {
     
     historico <<= 1;             
     
     if (amostra == 1)            
     {
      historico |= 0x01;
     }

     
     if ((historico & B00000111) == B00000110) //<------Verifica se o inicio do frame é valido------
     {
       
       pacote = 0;    
       bit = 1;       
       _Byte_buffer[0]= 
       _Byte_buffer[1]= 
       _Byte_buffer[2]= 
       _Byte_buffer[3]= 
       _Byte_buffer[4]= 
       _Byte_buffer[5]= 
       _Byte_buffer[6]= 
       _Byte_buffer[7]= 
       _Byte_buffer[8]=
       _Byte_buffer[9]=0;
       status = 2;
     }

    return;
  }
  
  if (status == 2) //<------Adquiri pacote------
  {

    _Byte_buffer[pacote] <<= 1;
    
    if (amostra == 1) 
    {
      _Byte_buffer[pacote] |= 0x01;
    }

    bit ++;
    
    if(bit > 7) 
    {
      bit = 0;
      pacote ++; 
    }
   
    if (pacote > 8)  
    {
     _acquired = true;      
     status = 0;            
    }
  }
}
//============================================================================================================================
bool WeatherSensor::acquired()
{
  bool temp = _acquired;
  _acquired = false;
  return temp;
}
//============================================================================================================================
byte WeatherSensor::calculate_crc()
{
  return _crc8(_Byte_buffer, 8);
}
//============================================================================================================================
bool WeatherSensor::valid()
{
  return (calculate_crc() == _Byte_buffer[4]);
}
//============================================================================================================================
byte* WeatherSensor::get_packet()
{
  return _Byte_buffer;
}
//=========================================================Esta função obtem o id do transmissor==============================
int WeatherSensor::get_sensor_id()
{
  return (_Byte_buffer[0] << 4) + (_Byte_buffer[1] >> 4);
}

//========================================================Esta função obtem a humidade relativa do ar=========================
byte WeatherSensor::get_humidity()
{
  int umid = _Byte_buffer[3];
  return umid / 2.59;
}
//=======================================================Esta função obtem a temperatura em graus celsius=====================

String WeatherSensor::get_temperature()
{
  int temperature;
  byte whole, partial;
  String s;
   
  temperature = ((_Byte_buffer[1] & B00000111) << 8) + _Byte_buffer[2];
  whole = temperature / 60 + 2;
  partial = temperature - (whole*10);
  s = String();
  if (_Byte_buffer[1] & B00001000)
  {
    s += String('-');
  }
  s += String(whole, DEC);
  s += '.';
  s += String(partial, DEC);
  return s;
}
//========================================================Esta função obtem o valor da variável crua==========================
int WeatherSensor::get_wind_speed_raw() 
{
    return _Byte_buffer[5]; // Raw
}
//========================================================Esta função obtem a rajada de vendo em Metros/seg===================

int WeatherSensor::get_wind_gust_ms() 
{
    return (_Byte_buffer[5] * 34.0f) / 100; // Metros/seg.
}
//========================================================Esta função obtem a rajada de vendo em Mph==========================
int WeatherSensor::get_wind_gust_mph() 
{
    return ((_Byte_buffer[5] * 34.0f) / 100) * 2.23693629f; // Mph
}
//========================================================Esta função obtem a rajada de vendo em kmh==========================
int WeatherSensor::get_wind_gust_kmh() 
{
  return ((_Byte_buffer[5] * 34.0f) / 100) * 3.6f; // Km/h
}
//========================================================Esta função obtem a direção do vendo================================
char* WeatherSensor::get_wind_direction_str() {
  int val = _Byte_buffer[8];
	return direcao_do_vendo_I[_Byte_buffer[8]];
}
//========================================================Esta função obtem a posção do vendo em grau=========================
uint8_t WeatherSensor::get_wind_direction_deg() {
  int val = _Byte_buffer[8];
	return direcao_do_vendo_R[ _Byte_buffer[8]];
}
//========================================================Esta função obtem a quantidade de chuca em ML=======================
float WeatherSensor::get_rainfall() 
{
	unsigned short rain_raw = (((unsigned short)_Byte_buffer[6] & 0x0f) << 8) | _Byte_buffer[7];
  return (float)rain_raw * 0.3f;
}
//========================================================Esta função obtem o estado da bateria===============================
char* WeatherSensor::get_battery() 
{
	if ((_Byte_buffer[8] >> 4) != 1) 
  {
		return "OK";
	} 
  else
  {
		return "LOW";
	}
}
//============================================================================================================================
uint8_t WeatherSensor::_crc8( uint8_t *addr, uint8_t len)
{
  uint8_t crc = 0;

  while (len--) {
    uint8_t inbyte = *addr++;
    for (uint8_t i = 8; i; i--) {
      uint8_t mix = (crc ^ inbyte) & 0x80;
      crc <<= 1; 
      if (mix) crc ^= 0x31;
      inbyte <<= 1;
    }
  }
  return crc;
}
//============================================================================================================================
