#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 1
#define max 10
using namespace std;

int main() {
    srand(time(NULL));

    int num1 = rand() % (max - min + 1) + min, 
        num2 = rand() % (max - min + 1) + min;
    
    if (num1 > num2) {
        cout << "The number" << num1 << " is the largest" << endl;
        cout << "The number" << num2 << " the smallest" << endl;
    } else if (num1 == num2) {
        cout << "The numbers " << num1 << " and " << num2 << " are equal" << endl;
    } else {
        cout << "The number " << num2 << " is the largest" << endl;
        cout << "The number " << num1 << " the smallest" << endl;
    }

    return 0;
}
