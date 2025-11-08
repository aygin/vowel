void print_somthing(void);

class WifiController {
  public:
    const char* ssid;  // Attribute
    const char* pass;  // Attribute
    WifiController(const char* ssid_ , const char* pass_);
};