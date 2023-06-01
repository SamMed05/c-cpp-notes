#include <iostream>
#include <cmath> // #include <math.h> for C
using namespace std;

int main() {
    float a;
    float b;
    float c;

    cout << "Enter the quadratic coefficient for the equation: " << endl;
    cin >> a;
    
    if (a == 0) {
        cout << "It's not a quadratic equation";
        return 0;
    }
    
    cout << "Enter the linear coefficient: " << endl;
    cin >> b;
    
    cout << "Enter the constant coefficient/free term: " << endl;
    cin >> c;
    
    float delta = pow(b, 2) - 4*a*c;
    
    if (delta < 0)
        cout << "The equation has no solutions" << endl;
    else if (delta == 0) {
        cout << "The equation has one solution" << endl;
        float x = -b / (2*a);
        cout << "The solution is: " << x << endl;
    } else {
        cout << "The equation has two solutions" << endl;
        float x1 = (-b + sqrt(delta)) / (2*a);
        cout << "The first solution is: " << x1 << endl;
        float x2 = (-b - sqrt(delta)) / (2*a);
        cout << "The second solution is: " << x2 << endl;
    }
    
    return 0;
}