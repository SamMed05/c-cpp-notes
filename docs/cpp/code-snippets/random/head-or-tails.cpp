#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 0
#define max 1
using namespace std;

int main() {
    srand(time(NULL));

    int coinTosses = 3, 
        headsCount = 0, 
        x;

    for (int i = 0; i < coinTosses; i++)
    {
        x = rand() % (max - min + 1) + min;
        if (x == 0)
        {
            cout << "Heads" << endl;
            headsCount++;
        }
        else {
            cout << "Tails" << endl;
        }
    }

    cout << "\nNumber of heads: " << headsCount << endl;
    cout << "Number of tails: " << (coinTosses - headsCount) << endl;

    return 0;
}
