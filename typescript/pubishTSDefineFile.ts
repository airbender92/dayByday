/*
 * @Author: wangyunbo
 * @Date: 2021-06-18 17:43:27
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-18 17:43:27
 * @Description: file content
 * @FilePath: \dayByday\typescript\pubishTSDefineFile.ts
 */
 // =========: Include definition file with library on npm===============
 // Add typings to your package.json
 {
    ...
    "typings": "path/file.d.ts"
    ...
}
// Now whenever that library is imported typescript will load the typings file

// ============webpack.config.js=====================
// install loaders npm install --save-dev ts-loader source-map-loader
// tsconfig.json
{
    "compilerOptions": {
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react" // if you want to use react jsx
    }
}

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: "./dist/bundle.js"
    },
    // Enable sourcemaps for defugging webpack's output
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
            {test: /\.js$/, loader: 'source-map-loader'}
        ]
    },
    /*****************************
     * If you want to use react *
     ****************************/
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    // "react": "React",
    // "react-dom": "ReactDOM"
    // },
}


// ==================Mixins==========================
// Parameter Description
// derivedCtor: The class that you want to use as the composition class
// baseCtors: An array of classes to be added to the composition class

// To create mixins, simply declare lightweight classes that can be used as "behaviours"
class Flies {
    fly() {
        alert('is it a bird? is it a plane?')
    }
}

class Climbs {
    climb() {
        alert('My spider-sense is tingling')
    }
}

class Bulletproof {
    deflect() {
        alert('My wings are a shield of steel')
    }
}
// You can then apply these behaviours to a composition class:
class BeetleGuy implements Climbs, Bulletproof {
    climb: () => void;
    deflect: () => void;
}

applyMixins(BeetleGuy, [Climbs, Bulletproof]);
// The applyMixins function is needed to do the work of composition.
function applyMixins(derivedCtor: any, baseCtors: any) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if(name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        })
    })
}