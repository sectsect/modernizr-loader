import modernizr from 'modernizr';
import NativeModule from 'module';

const wrapOutput = (output: string) => {
  // Exposing Modernizr as a module.
  return `;(function(window){
      var hadGlobal = 'Modernizr' in window;
      var oldGlobal = window.Modernizr;
      ${output}
      module.exports = window.Modernizr;
      if (hadGlobal) {
        window.Modernizr = oldGlobal;
      } else {
        delete window.Modernizr;
      }
    })(window);`;
};

module.exports = function (config: string) {
  if (typeof this.cacheable === 'function') {
    this.cacheable();
  }

  let exec = (code: string, filename: string) => {
    const module = new NativeModule(filename, this);
    // @ts-ignore _nodeModulePaths is deprecated and undocumented Node.js API
    module.paths = NativeModule._nodeModulePaths(this.context);
    module.filename = filename;
    (module as any)._compile(code, filename);
    return module.exports;
  };
  exec = exec.bind(this);

  const cb = this.async();

  (modernizr as any).build(exec(config, this.resource), (output: string) => {
    cb(null, wrapOutput(output));
  });
};
