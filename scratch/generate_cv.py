# Compatibility entry point for the catalog-based CV generator.
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).resolve().parents[1] / 'scripts/generate_cv.py'), run_name='__main__')
