for d in $(ls -d */); do
$album="../music/$d"
if [ ! -d "$album" ]; then
mkdir $album
  # Control will enter here if $DIRECTORY doesn't exist.
fi
done;