#!/bin/bash
# ParityScope SDK Installer
# Usage: curl -sSL https://parityscope.com/install.sh | bash

set -e

echo "Installing ParityScope SDK v0.2.0..."
echo ""

pip install parityscope \
  --index-url https://parityscope.com/sdk/simple/ \
  --extra-index-url https://pypi.org/simple/

echo ""
echo "ParityScope installed successfully!"
echo ""
echo "Next steps:"
echo "  1. Activate your license:  parityscope license activate PS-TRIAL-your-key"
echo "  2. Run your first audit:   parityscope audit --help"
echo "  3. View documentation:     https://parityscope.com/developers"
echo ""
