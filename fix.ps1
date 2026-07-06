# 1. Remove @import from style.css
$cssPath = "c:\Bluff\Yogya\style.css"
$css = Get-Content $cssPath -Raw
$css = $css -replace "@import url\('https://fonts\.googleapis\.com/css2\?family=JetBrains\+Mono.*?\);\r?\n?", ""
Set-Content -Path $cssPath -Value $css

# 2. Inject Google Fonts link tags into all HTML files
$fontsHtml = @"
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600&display=swap" rel="stylesheet">
"@

Get-ChildItem -Path "c:\Bluff\Yogya" -Recurse -Filter *.html | ForEach-Object {
    $html = Get-Content $_.FullName -Raw
    $html = $html -replace '<link rel="stylesheet" href="/style\.css">', "$fontsHtml`n  <link rel=`"stylesheet`" href=`"/style.css`">"
    
    # Also fix SEO meta description in index.html to be more descriptive
    if ($_.Name -eq "index.html") {
        $html = $html -replace 'content="Yogya Chugh - Software Developer"', 'content="Yogya Chugh is a Software Engineer and Builder based in Delhi, specializing in C++, Rust, Python, and cross-platform architecture."'
    }
    
    Set-Content -Path $_.FullName -Value $html
}
