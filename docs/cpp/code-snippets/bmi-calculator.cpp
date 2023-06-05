#include <iostream>
#include <cmath>
using namespace std;
  
int main() {
    float height;
    float weight;

    cout << "Enter height: " << endl;
    cin >> height;
    cout << "Enter weight: " << endl;
    cin >> weight;
    
    float bmi = weight / pow(height, 2);
    cout << "The BMI is " << bmi << endl;
    
    if (bmi < 18.5)
        cout << "Underweight";
    else if (bmi >= 18.5 && bmi < 24.9)
        cout << "Healthy";
    else if (bmi >= 24.9 && bmi < 30)
        cout << "Overweight";
    else if (bmi >= 30)
        cout << "Obese";
  
    return 0;
}