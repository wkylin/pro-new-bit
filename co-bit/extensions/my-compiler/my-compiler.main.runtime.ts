import { MainRuntime } from '@teambit/cli';
import { CompilerAspect, CompilerMain } from '@teambit/compiler';
import { MyCompiler } from './my-compiler.compiler';
import { MyCompilerAspect } from './my-compiler.aspect';

export class MyCompilerMain {
  constructor(private compiler: CompilerMain) {}

  static slots = [];
  static dependencies = [CompilerAspect];
  static runtime = MainRuntime;

  distDir = 'dist';

  /* Set the main property of the component's package with
  the relative output path for the main file */
  getPackageJsonProps() {
    return {
      main: '${this.distDir}/{main}.js',
    };
  }

  createCompiler(): MyCompiler {
    return new MyCompiler(MyCompilerAspect.id, this.distDir, this.compiler);
  }

  static async provider([compiler]: [CompilerMain]) {
    return new MyCompilerMain(compiler);
  }
}

MyCompilerAspect.addRuntime(MyCompilerMain);
