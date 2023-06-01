#include <iostream>
using namespace std;

int main() {
    int x, y;
    float result;
    char op;

    cout << "Enter the first number: " << endl;
    cin >> x;
    cout << "Enter the second number: " << endl;
    cin >> y;

    cout << "\nEnter the operator (+, -, *, /): " << endl;

    cout << "\n+ addition" << endl;
    cout << "- subtraction" << endl;
    cout << "* multiplication" << endl;
    cout << "/ division" << endl;

    cout << "\nOperator: ";
    cin >> op;

    switch (op) {
    case '+':
        result = x + y;
        break;
    case '-':
        result = x - y;
        break;
    case '*':
        result = x * y;
        break;
    case '/':
        if (y == 0)
            cout << "You can't divide by 0" << endl;
        else
            result = (float) (x / y);
        break;
    default:
        cout << "Incorret operation" << endl;
    }

    cout << "\nThe result is: " << result << endl;

    return 0;
}