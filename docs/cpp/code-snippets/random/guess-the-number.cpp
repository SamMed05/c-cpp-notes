#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 1
#define max 20
using namespace std;

int main() {
    srand(time(NULL));

    int attempt, count = 0;
    int n = rand() % (max - min + 1) + min;

    cout << "Secret number generated. Now guess it!" << endl;

    do {
        cout << "Enter a number from 1 to 20: " << endl;
        cin >> attempt;
        count++;

        if (n != attempt && n < attempt)
            cout << "Attempt failed, try with a lower number." << endl;
        else if (n != attempt && n > attempt)
            cout << "Attempt failed, try with a higher number." << endl;
    } while (attempt != n);

    cout << "You guessed in " << count << " attempts" << endl;

    return 0;
}
