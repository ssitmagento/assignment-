<?php
// Allow cross-origin requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

 
$banners = [
    'default' => [
        'imageUrl' => 'https://example.com/default-banner.jpg',
        'linkUrl' => 'https://example.com',
        'altText' => 'Default Banner',
        'width' => 728,
        'height' => 90,
        'position' => 'bottom-right'
    ]
];

 
function getBannerDetails($bannerId = 'default')
{
    global $banners;

 
    if (isset($banners[$bannerId])) {
        return $banners[$bannerId];
    }

 
    return $banners['default'];
}

 
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $bannerId = isset($_GET['id']) ? $_GET['id'] : 'default';
    $bannerDetails = getBannerDetails($bannerId);

    echo json_encode($bannerDetails);
    exit;
}
