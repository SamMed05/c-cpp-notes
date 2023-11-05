#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(NULL));

    int n, count = 0;

    cout << "How many numbers you want to generate?" << endl;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        int val = rand();
        if (val % 3 == 0)
        {
            cout << "Multiple number of 3: " << val << endl;
            count++;
        }
    }

    if (count == 0)
        cout << "No multiple number of 3 was generated." << endl;
    else
        cout << count << " numbers multiple of 3 have been generated." << endl;
   
    return 0;
}
