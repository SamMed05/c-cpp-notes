#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    bool isValidTriangle;
    
    cout << "Enter the three side lengths (integers): " << endl;
    
    cin >> a;
    cin >> b;
    cin >> c;

    // check validity of the triangle
    if (a + b > c && a + c > b && b + c > a) {
        isValidTriangle = true;
    } else {
        isValidTriangle = false;
    }
    
    // determine the type of triangle
    if (a == b && b == c) {
        cout << "The triangle is equilateral" << endl;
    } else if (a == b && b != c || 
               a == c && b != c || 
               b == c && a != c) {
        cout << "The triangle is isosceles" << endl;
    } else {
        cout << "The triangle is scalene" << endl;
    }
    
    return 0;
}