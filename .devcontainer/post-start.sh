# Replace default first run notice with our custom notice
# https://github.com/microsoft/vscode-dev-containers/blob/main/containers/ubuntu/.devcontainer/library-scripts/common-debian.sh#L238
install_first_run_notice() {
  sudo cp ./.devcontainer/resources/first-run-notice.txt /workspaces/.codespaces/shared/first-run-notice.txt
  sudo rm -f /home/vscode/.config/vscode-dev-containers/first-run-notice-already-displayed

}
install_first_run_notice


# Add some useful shell shortcuts, mainly for managing docker
setup_bash_aliases() {
  sudo cp ./.devcontainer/resources/bash_aliases /home/vscode/.bash_aliases
}
setup_bash_aliases


# Set some useful git defaults
set_git_defaults() {
  git config pull.rebase false
}
set_git_defaults