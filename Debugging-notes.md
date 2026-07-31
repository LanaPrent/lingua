Date: 30.07.2026.
1. Problem: 
404 after deployment.

Cause:
Git didn't recognize filename case change.

Fix:
git mv About.html about.html
git commit
git push
