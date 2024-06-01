// swift-tools-version:5.5
import PackageDescription

let package = Package(
    name: "swift",
    products: [
        .library(
            name: "swift",
            targets: ["swift"]),
    ],
    dependencies: [
        // Declare your dependencies here, like:
        .package(url: "https://github.com/apple/swift-argument-parser.git", from: "1.0.0")
    ],
    targets: [
        .target(
            name: "swift",
            dependencies: ["ArgumentParser"]), // Add ArgumentParser as a dependency here
        .testTarget(
            name: "swiftTests",
            dependencies: ["swift"]),
    ]
)
