document.getElementById('inputType').addEventListener('change', function() {
    const uploadForm = document.getElementById('uploadForm');
    const pasteForm = document.getElementById('pasteForm');

    // Hide both forms initially
    uploadForm.classList.add('hidden');
    pasteForm.classList.add('hidden');

    // Show the relevant form based on the selection
    if (this.value === 'upload') {
        uploadForm.classList.remove('hidden');
    } else if (this.value === 'paste') {
        pasteForm.classList.remove('hidden');
    }
});

// Handle the form submission for file uploads
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const htmlFile = document.getElementById('htmlFile').files[0];
    const cssFile = document.getElementById('cssFile').files[0];
    const jsFile = document.getElementById('jsFile').files[0];

    const readerHTML = new FileReader();
    const readerCSS = new FileReader();
    const readerJS = new FileReader();

    readerHTML.onload = function(e) {
        const htmlContent = e.target.result;
        readerCSS.onload = function(e) {
            const cssContent = `<style>${e.target.result}</style>`;
            readerJS.onload = function(e) {
                const jsContent = `<script>${e.target.result}</script>`;
                const finalContent = htmlContent
                    .replace('</head>', `${cssContent}</head>`)
                    .replace('</body>', `${jsContent}</body>`);
                const previewFrame = document.getElementById('preview');
                previewFrame.srcdoc = finalContent;
            };
            readerJS.readAsText(jsFile);
        };
        readerCSS.readAsText(cssFile);
    };
    readerHTML.readAsText(htmlFile);
});

// Handle the form submission for pasting code
document.getElementById('pasteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const htmlContent = document.getElementById('htmlCode').value;
    const cssContent = `<style>${document.getElementById('cssCode').value}</style>`;
    const jsContent = `<script>${document.getElementById('jsCode').value}</script>`;

    const finalContent = htmlContent
        .replace('</head>', `${cssContent}</head>`)
        .replace('</body>', `${jsContent}</body>`);
    
    const previewFrame = document.getElementById('preview');
    previewFrame.srcdoc = finalContent;
});
