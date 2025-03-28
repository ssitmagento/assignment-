(function() {
     const defaultConfig = {
        apiUrl: 'https://yourdomain.com/banner.php',
        width: 728,
        height: 90,
        position: 'bottom-right',
        bannerId: 'default'
    };

    function createBanner(config) {
        const mergedConfig = { ...defaultConfig, ...config };
         fetch(`${mergedConfig.apiUrl}?id=${mergedConfig.bannerId}`)
            .then(response => response.json())
            .then(bannerData => {
            
                const finalBannerData = { ...bannerData, ...mergedConfig };

               
                const bannerContainer = document.createElement('div');
                bannerContainer.style.cssText = `
                    position: fixed;
                    ${getBannerPosition(finalBannerData.position)};
                    width: ${finalBannerData.width}px;
                    height: ${finalBannerData.height}px;
                    z-index: 9999;
                    transition: all 0.3s ease;
                `;
                const bannerImage = document.createElement('a');
                bannerImage.href = finalBannerData.linkUrl;
                bannerImage.target = '_blank';
                bannerImage.style.cssText = `
                    display: block;
                    width: 100%;
                    height: 100%;
                    background-image: url('${finalBannerData.imageUrl}');
                    background-size: cover;
                    background-position: center;
                `;
                bannerImage.setAttribute('alt', finalBannerData.altText);
                const closeButton = document.createElement('button');
                closeButton.innerHTML = '×';
                closeButton.style.cssText = `
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: rgba(0,0,0,0.5);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                `;
                closeButton.addEventListener('click', () => {
                    bannerContainer.style.display = 'none';
                });

                bannerContainer.appendChild(closeButton);
                bannerContainer.appendChild(bannerImage);
                document.body.appendChild(bannerContainer);
            })
            .catch(error => {
                console.error('Failed to load banner:', error);
            });
    }
   function getBannerPosition(position) {
        switch(position) {
            case 'top-left': return 'top: 10px; left: 10px;';
            case 'top-right': return 'top: 10px; right: 10px;';
            case 'bottom-left': return 'bottom: 10px; left: 10px;';
            case 'bottom-right': return 'bottom: 10px; right: 10px;';
            default: return 'bottom: 10px; right: 10px;';
        }
    }

 
    window.createBanner = createBanner;

  
    if (document.currentScript) {
        const scriptElement = document.currentScript;
        const config = {
            width: scriptElement.getAttribute('data-width') || undefined,
            height: scriptElement.getAttribute('data-height') || undefined,
            position: scriptElement.getAttribute('data-position') || undefined,
            bannerId: scriptElement.getAttribute('data-banner-id') || undefined
        };
        createBanner(config);
    }
})();