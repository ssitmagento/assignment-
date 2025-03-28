<?php
// Allow cross-origin requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// in a real-world scenario, this would come from a database)
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

// Simple API endpoint to retrieve banner details
function getBannerDetails($bannerId = 'default')
{
    global $banners;

    // Check if the requested banner exists
    if (isset($banners[$bannerId])) {
        return $banners[$bannerId];
    }

    // Return default banner if not found
    return $banners['default'];
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $bannerId = isset($_GET['id']) ? $_GET['id'] : 'default';
    $bannerDetails = getBannerDetails($bannerId);

    echo json_encode($bannerDetails);
    exit;
}
