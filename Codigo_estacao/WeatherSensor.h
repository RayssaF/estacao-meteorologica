/************* Atenção **************
 *** O Codigo esta livre para uso ***
 * desde que seja mantida sua fonte *
 ************************************
 ****** Att. Equipe UsinaInfo *******
 ************************************
 ******* www.usinainfo.com.br *******
 ***********************************/

#ifndef WeatherSensor_h
#define WeatherSensor_h


#if defined(ARDUINO) && ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

//============================================================================================================================
class WeatherSensor
{

  public:

    volatile byte _interval = 0;
    volatile byte interval = 0;
    int tempc = 0,tempf=0; 
    volatile unsigned long old = 0, packet_count = 0; 
    volatile unsigned long spacing, now, average_interval;

    WeatherSensor();
    void Receiver(byte interval);
    bool acquired();
    int get_sensor_id();
    byte* get_packet();
    byte calculate_crc();
    bool valid();
    String get_temperature();
    String get_temperature_K();
    byte get_humidity();
    int get_wind_speed_raw();
    int get_wind_gust_ms();
    int get_wind_gust_mph();
    int get_wind_gust_kmh();
    char* get_wind_direction_str();
    uint8_t get_wind_direction_deg();
    float get_rainfall();
    char* get_battery();
      
  private:
  
    byte _Byte_buffer[10];
    bool _acquired; 
    uint8_t _crc8( uint8_t *addr, uint8_t len);
};
//============================================================================================================================



#endif

