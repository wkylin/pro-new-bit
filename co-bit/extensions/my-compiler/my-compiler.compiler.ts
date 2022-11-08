import {
  BuildContext,
  BuiltTaskResult,
  ComponentResult,
} from '@teambit/builder';
import {
  Compiler,
  CompilerMain,
  TranspileFileParams,
  TranspileFileOutput,
} from '@teambit/compiler';

export class MyCompiler implements Compiler {

  constructor(readonly id: string, readonly distDir, private compiler: CompilerMain) {}

  /**
   * Detemines whether unsupported files (such as assets)
   * should be copied by Compiler aspect into the 'dist' directory
   */
  shouldCopyNonSupportedFiles = true;

  /* The name of the compiler being used. For example, TypeScript, Babel, etc. */
  displayName = 'antd-babel';

  /* The version of the compiler being used. For example '1.0.0' */
  version(): string {
    return '1.0.0'
  };

  /**
   * Use this for compilation in the workspace.
   * This will compile one file content at a time (alternatively, use 'transpileComponent') */
  transpileFile(fileContent: string, transpileFileParams: TranspileFileParams): TranspileFileOutput {
    return [{
      outputText: '',
      outputPath: ''
    }]
  }


  async build(context: BuildContext): Promise<BuiltTaskResult> {
      let componentsResults: ComponentResult[] = [];
      return {
          /* Sets the files to persist as the Component's artifacts,
          and describes them. */
          artifacts: [
              {
                  generatedBy: this.id,
                  name: 'compilation output',
                  globPatterns: [`${this.distDir}/**`],
              },
          ],
            componentsResults,
      };
  }

  /* This is optional but recommended.
  Not using it will require consumers of your compiler to use two APIs and have two depndencies
  to their Envs - your compiler
  */
  createTask() {
      return this.compiler.createTask('MyCompiler', this);
  }

  /**
   * Given a source file, return its parallel in the dists. e.g. index.ts => dist/index.js.
   * Needed by aspects such as Pkg to determine the main prop.
   */
  getDistPathBySrcPath(srcPath: string): string {
    return srcPath;
  }

  /**
   * Returns a boolean indicating whether a file is supported by the compiler or not.
   * For example, this API is used by Compiler aspect to copy unsupported files to the dist directory.
   */
  isFileSupported(filePath: string): boolean {
    return this.shouldCopyNonSupportedFiles;
  }
}
