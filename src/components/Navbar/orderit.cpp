#include <bits/stdc++.h>
using namespace std;

static int calculateMoves(const vector<int>& posArr) {
    int len = (int)posArr.size();
    string startStr(len, '\0'), goalStr(len, '\0');

    for (int idx = 0; idx < len; ++idx) 
        startStr[idx] = char(posArr[idx]);

    for (int idx = 0; idx < len; ++idx) 
        goalStr[idx] = char(idx);

    if (startStr == goalStr) return 0;

    vector<array<int,3>> shifts;
    shifts.reserve(len * len * len);

    for (int L = 0; L < len; ++L) {
        for (int R = L + 1; R <= len; ++R) {
            int segSize = R - L;
            for (int newPos = 0; newPos <= len - segSize; ++newPos) {
                if (newPos == L) continue;
                shifts.push_back({L, R, newPos});
            }
        }
    }

    deque<string> dqStart, dqGoal;
    unordered_map<string,int> distStart, distGoal;

    dqStart.push_back(startStr);
    distStart.emplace(startStr, 0);

    dqGoal.push_back(goalStr);
    distGoal.emplace(goalStr, 0);

    auto bfsExpand = [&](deque<string>& dqCurr,
                         unordered_map<string,int>& distCurr,
                         unordered_map<string,int>& distOther) -> int {

        int qSize = (int)dqCurr.size();
        while (qSize--) {
            string cur = dqCurr.front(); 
            dqCurr.pop_front();

            int curDist = distCurr[cur];

            for (auto &mv : shifts) {
                int L = mv[0], R = mv[1], K = mv[2];
                int segSize = R - L;

                string block = cur.substr(L, segSize);
                string rem = cur.substr(0, L) + cur.substr(R);
                string nxt = rem.substr(0, K) + block + rem.substr(K);

                if (distCurr.count(nxt)) continue;

                int nxtDist = curDist + 1;

                if (distOther.count(nxt)) 
                    return nxtDist + distOther[nxt];

                distCurr.emplace(nxt, nxtDist);
                dqCurr.push_back(nxt);
            }
        }
        return -1;
    };

    while (!dqStart.empty() && !dqGoal.empty()) {
        if (dqStart.size() <= dqGoal.size()) {
            int ans = bfsExpand(dqStart, distStart, distGoal);
            if (ans != -1) return ans;
        } else {
            int ans = bfsExpand(dqGoal, distGoal, distStart);
            if (ans != -1) return ans;
        }
    }

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    if (!(cin >> N)) return 0;

    string dummy;
    getline(cin, dummy);
    getline(cin, dummy);

    vector<string> shuffled(N), original(N);
    for (int i = 0; i < N; ++i) getline(cin, shuffled[i]);

    getline(cin, dummy);

    for (int i = 0; i < N; ++i) getline(cin, original[i]);

    unordered_map<string,int> indexMap;
    indexMap.reserve(N * 2);

    for (int i = 0; i < N; ++i) 
        indexMap[original[i]] = i;

    vector<int> mapped(N);
    for (int i = 0; i < N; ++i)
        mapped[i] = indexMap[shuffled[i]];

    cout << calculateMoves(mapped) << "\n";

    return 0;
}
