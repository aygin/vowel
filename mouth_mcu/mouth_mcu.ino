#include <ESP32Servo.h>

#define SERVO_STEPS               4 //degrees
#define SERVO_TIME_STEP           8 //ms
#define MIN_ANGLE                 100 //degrees
#define MAX_ANGLE                 150 //degrees

#define MOUTH_CLOSE_ANGLE         MIN_ANGLE
#define A_ANGLE                   150
#define O_ANGLE                   140
#define U_ANGLE                   130
#define E_ANGLE                   120
#define I_ANGLE                   110

static const int servoPin = 13;

int mouth_close_angle = MIN_ANGLE;
int current_angle = MIN_ANGLE;

Servo servo1;

void go_to_angle(int destination_angle){

  if(destination_angle>current_angle){

    for(int posDegrees = current_angle; posDegrees <= destination_angle; posDegrees+=SERVO_STEPS) {
      servo1.write(posDegrees);
      current_angle = posDegrees;
      delay(SERVO_TIME_STEP);
    }

  }else{

    for(int posDegrees = current_angle; posDegrees >= destination_angle; posDegrees-=SERVO_STEPS) {
      servo1.write(posDegrees);
      current_angle = posDegrees;
      delay(SERVO_TIME_STEP);
    }

  }

}

void say_vowel(char vowel){

  switch (vowel){

    case 'a':
    case 'A':
      go_to_angle(A_ANGLE);
      go_to_angle(MOUTH_CLOSE_ANGLE);
      break;

    case 'o':
    case 'O':
      go_to_angle(O_ANGLE);
      go_to_angle(MOUTH_CLOSE_ANGLE);
      break;

    case 'u':
    case 'U':
      go_to_angle(U_ANGLE);
      go_to_angle(MOUTH_CLOSE_ANGLE);
      break;

    case 'e':
    case 'E':
      go_to_angle(E_ANGLE);
      go_to_angle(MOUTH_CLOSE_ANGLE);
      break;

    case 'i':
    case 'I':
      go_to_angle(I_ANGLE);
      go_to_angle(MOUTH_CLOSE_ANGLE);
      break;
  }

}

void setup() {

  Serial.begin(115200);
  servo1.attach(servoPin);
  servo1.write(MIN_ANGLE);
  current_angle = MIN_ANGLE;
  delay(1000);
}

int angle = 0;

void loop() {

  if (Serial.available()) { 
    say_vowel(Serial.read());
  }
}