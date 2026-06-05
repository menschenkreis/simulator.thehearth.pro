<?php
/**
 * Database Connection Test Script
 * Upload to server and visit in browser to verify DB connectivity.
 * DELETE this file after testing — it exposes credentials!
 */

$host = getenv('DB_HOST') ?: 'localhost';
$port = getenv('DB_PORT') ?: '3306';
$name = getenv('DB_NAME') ?: 'sim_prod01';
$user = getenv('DB_USER') ?: 'sim_prod01';
$pass = getenv('DB_PASS') ?: '5d#d481Tm';

header('Content-Type: text/plain');

echo "=== Database Connection Test ===\n\n";

try {
    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    echo "✅ Connection: SUCCESS\n";
    echo "   Host: {$host}:{$port}\n";
    echo "   Database: {$name}\n\n";

    // Server info
    $stmt = $pdo->query("SELECT VERSION() AS ver, NOW() AS time, USER() AS user");
    $info = $stmt->fetch();
    echo "📋 Server Info:\n";
    echo "   MySQL version: {$info['ver']}\n";
    echo "   Server time: {$info['time']}\n";
    echo "   Connected as: {$info['user']}\n\n";

    // List tables
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "📦 Tables (" . count($tables) . "):\n";
    if (count($tables) > 0) {
        foreach ($tables as $t) {
            echo "   - {$t}\n";
        }
    } else {
        echo "   (empty database)\n";
    }

} catch (PDOException $e) {
    echo "❌ Connection FAILED\n";
    echo "   Error: " . $e->getMessage() . "\n";
}

echo "\n⚠️  Delete this file after testing!\n";
