using Microsoft.Win32;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;

namespace NoteEditorApp;

public class MainWindowViewModel : INotifyPropertyChanged
{
    private string selectedFilePath;

    public string SelectedFilePath
    {
        get { return selectedFilePath; }
        set
        {
            selectedFilePath = value;
            OnPropertyChanged();
        }
    }

    public ICommand SelectFileCommand { get; }

    public MainWindowViewModel()
    {
        SelectFileCommand = new RelayCommand(SelectFile);
    }

    private void SelectFile()
    {
        var openFileDialog = new OpenFileDialog();
        if (openFileDialog.ShowDialog() == true)
        {
            SelectedFilePath = openFileDialog.FileName;
            // Do something with the selected file path
        }
    }

    // INotifyPropertyChanged implementation
    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}

