# influencerAPP


You can install a linter to detect errors on atom

 1. Go to File > Settings > Install
 2. Search for package 'linter-eslint', select the first result and install it
 3. Install also the package 'linter' with a sub-title 'A Base Linter with Cow Powers'
 4. Open CMD or powershell then run this code to your project directory \n
    "npm install --save-dev eslint-config-rallycoding"
 5. create a file named .eslintrc (already contained in the project)
    {
      "extends" : "rallycoding"
    }
