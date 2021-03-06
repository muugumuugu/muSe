import argparse
from csv import DictReader, DictWriter
from os.path import join
from os import walk
from os import getcwd
from mutagen.mp3 import MP3
from mutagen.id3 import ID3NoHeaderError
from mutagen.easyid3 import EasyID3

def parse_arguments():
    parser = argparse.ArgumentParser(description='tool that can preapre a list of files and then tag those files. two modes: list all files in particular directory "mode: list" or tag all those files by the csv file created in the first step "mode: tag"')
    parser.add_argument('-m', metavar='mode', choices=['list', 'tag'], help='the mode of operation EITHER list all files in particular directory "mode: list" OR tag all those files by the csv file created in the first step "mode: tag"', action='store')
    parser.add_argument('-ld', metavar='listdir', help='the absolute path/to/directory_with_folders_and_files/' , action='store')
    parser.add_argument('-cf', metavar='csvfile', help='location to the csv file that contains all information to tag, e.g. ./tags.csv', action='store')
    args = parser.parse_args()
    return args

def files_to_csv(list_dir):
    '''open a csv file and walk through all directories in current one'''
    field_list = ['folder', 'file', 'album', 'artist', 'title','genre','decription']
    # prepare row
    row = {i:None for i in field_list}
    # prepare csv
    csv_file = open('tags.csv', 'w', newline='')
    cw = DictWriter(csv_file, delimiter="\t", fieldnames=field_list)
    cw.writeheader()
    # walk enclosed dirs and files
    for root, dirs, files in walk(list_dir):
        # typical answer while walking through the directories
        # ('./', ['dir1', 'dir2'], ['f1']),
        # ('./dir1', [], ['f2', 'f3', 'f4'])
        # ('./dir2', ['dir3'], ['f5', 'f6'])
        # ('./dir3', [], ['f7'])
        for file in files:
            if 'mp3' in file:
                row['folder'] = root
                row['file'] = file
                cw.writerow(row)
    csv_file.close()

def add_tags(mp3_filepath, album, artist, title,genre,description):
    '''add tags to a file'''
    mp3 = EasyID3(mp3_filepath)
    mp3['album'] = album
    mp3['artist'] = artist
    mp3['title'] = title
    mp3['genre'] = genre
    mp3['isrc'] = description
    print(f'[DONE] {mp3}')
    mp3.save(mp3_filepath)

def make_tags(mp3_filepath):
    '''enable tags in a mp3 file'''
    mp3 = MP3(mp3_filepath)
    mp3.add_tags()
    mp3.save(mp3_filepath, v1=2)

def process_file(row):
    '''process a row from csv, handling if no tags enabled yet'''
    mp3_filepath = join(row['folder'], row['file'])
    album = row['album']
    artist = row['artist']
    title = row['title']
    genre = row['genre']
    description=row['description']
    try:
        add_tags(mp3_filepath, album, artist, title,genre,description)
    except ID3NoHeaderError:
        make_tags(mp3_filepath)
        add_tags(mp3_filepath, album, artist, title,genre,description)

def main():
    namespace = vars(parse_arguments())
    #print('namespace', namespace)
    if (namespace.get('m', None) == 'list'):
        files_to_csv(namespace['ld'])
    elif (namespace.get('m', None) == 'tag'):
        reader = DictReader(open(namespace['cf']))
        next(reader) # skipping header line
        for row in reader:
            process_file(row)

if __name__ == '__main__':
    main()