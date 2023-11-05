#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 65 // see ASCII table
#define max 90 // see ASCII table
using namespace std;

int main() {
    srand(time(NULL));
    char lett1, lett2, lett3;

    // a char in C/C++ is already a number (the character's ASCII code) 
    // so there's no need to explicitly make a conversion
    lett1 = rand() % (max - min + 1) + min;
    lett2 = rand() % (max - min + 1) + min;
    lett3 = rand() % (max - min + 1) + min;

    cout << lett1 << endl;
    cout << lett2 << endl;
    cout << lett3 << endl;

    int count = 0;

    if (lett1 == 'A' || lett1 == 'E' || lett1 == 'I' || lett1 == 'O' || lett1 == 'U') {
        count++;
    }
    if (lett2 == 'A' || lett2 == 'E' || lett2 == 'I' || lett2 == 'O' || lett2 == 'U') {
        count++;
    }
    if (lett3 == 'A' || lett3 == 'E' || lett3 == 'I' || lett3 == 'O' || lett3 == 'U') {
        count++;
    }

    cout << "There are " << count << " vowels among the generated letters" << endl;

    return 0;
}
