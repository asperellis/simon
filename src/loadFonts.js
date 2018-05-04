import FontFaceObserver from 'fontfaceobserver';

// font loader applications
const loadFonts = () => {
  // Optimization for Repeat Views
  if (sessionStorage.criticalFoftFontsLoaded) {
    document.documentElement.className += ' fonts-stage-1 fonts-stage-2';
    return;
  }

  // Subset font containing less characters. Data uri in application level styles
  const fontASubset = new FontFaceObserver('SimonCircularProSubset');

  // Load the subset font
  window.Promise.all([fontASubset.load()]).then(function() {
    // then mark the document element at stage one
    document.documentElement.className += ' fonts-stage-1';

    const Bold = new FontFaceObserver('SimonCircularPro-Bold');
    const Book = new FontFaceObserver('SimonCircularPro-Book');
    const Light = new FontFaceObserver('SimonCircularPro-Light');

    // load all other fonts here
    window.Promise.all([Bold.load(), Book.load(), Light.load()]).then(
      function() {
        // then update the document element to the final load stage
        document.documentElement.className += ' fonts-stage-2';

        // Optimization for Repeat Views
        sessionStorage.criticalFoftFontsLoaded = true;
      }
    );
  });
};

export default loadFonts;
