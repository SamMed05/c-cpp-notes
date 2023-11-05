#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 1
#define max 10
using namespace std;

int main() {
    srand(time(NULL));

    int input, attempts = 0, n;

    n = rand() % (max - min + 1) + min;

    do {
        attempts++;

        cout << "Enter a number between 1 and 10:" << endl;
        cin >> input;

        if (input == n) {
            cout << "\nYou won with " << attempts << " attempts." << endl;
            break;
        }
        else if (input < n && attempts < 3)
            cout << "\nWrong, try again with a larger number." << endl;
        else if (input > n && attempts < 3)
            cout << "\nWrong, try again with a smaller number." << endl;
        else
            cout << "You have finished the attempts" << endl;
    } while (attempts < 3);

    return 0;
}
