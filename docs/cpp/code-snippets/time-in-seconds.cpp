#include <iostream>
using namespace std;

int main() {
    int hours, minutes, seconds;

    do {
        cout << "Hours: " << endl;
        cin >> hours;
    } while (hours < 0);
    do {
        cout << "Minutes: " << endl;
        cin >> minutes;
    } while (minutes < 0);
    do {
        cout << "Seconds: " << endl;
        cin >> seconds;
    } while (seconds < 0);

    hours = hours * 60 * 60;
    minutes = minutes * 60;

    int total = hours + minutes + seconds;

    cout << "The conversion in seconds is: " << total << endl;

    return 0;
}